#!/usr/bin/env bash
set -Eeuo pipefail

# ISSUES 

# Still adds unnecessary boilerplate such as "Certainly, here's a cleaned up version of your text"
# Sometimes a sentence is split in half by the chunking algorithm

# Windows forced an update in the middle of night, causing me to restart from where it left off..
# I have to run "ollama run vanilj/phi-4" a few times beforehand to avoid a timeout error.

#############################
#  Configuration Variables  #
#############################

CHUNK_LINES=25  # Number of lines per chunk
MODEL_COMMAND=("ollama" "run" "vanilj/phi-4")
PROGRESS_FILE="progress.log"

#############################
#  Preparatory Checks       #
#############################

if ! command -v "${MODEL_COMMAND[0]}" >/dev/null 2>&1; then
  echo "Error: '${MODEL_COMMAND[0]}' is not installed or not in PATH."
  exit 1
fi

#############################
#  Script Initialization    #
#############################

main_dir="$(pwd)"  
touch "$main_dir/$PROGRESS_FILE"

log() {
  local message="[${USER:-$(whoami)}@$(hostname)] [$(date '+%Y-%m-%d %H:%M:%S')] $*"
  echo "$message"
  echo "$message" >> "$main_dir/$PROGRESS_FILE"
}

log "Script started."

#############################
#  Preprocessing Function   #
#############################

preprocess_vtt() {
  local file="$1"
  grep -v -- '-->' "$file" \
    | grep -v '^WEBVTT' \
    | grep -vE '^[0-9]+$'
}

#############################
#  Processing Function      #
#############################

process_files() {
  local dir="$1"
  log "Processing directory: $dir"

  shopt -s nullglob
  local vtt_files=("$dir"/*.vtt)
  local txt_files=("$dir"/*.txt)
  shopt -u nullglob

  local all_files=("${vtt_files[@]}" "${txt_files[@]}")

  if [[ ${#all_files[@]} -eq 0 ]]; then
    log "No .vtt or .txt files found in $dir"
    return
  fi

  for file in "${all_files[@]}"; do
    [[ -f "$file" && ! -L "$file" ]] || continue

    local file_name
    file_name="$(basename "$file")"
    local output_file="${file%.vtt}.cleaned.txt"
    local temp_dir
    temp_dir="$(mktemp -d "$dir/tmp_${file_name}_XXXXXX")"

    log "Processing file: $file"
    log "Output file: $output_file"

    # 1) Preprocess if it's VTT. Otherwise, copy as-is.
    local preprocessed_file="$temp_dir/preprocessed.txt"
    if [[ "$file" == *.vtt ]]; then
      preprocess_vtt "$file" > "$preprocessed_file"
    else
      cp "$file" "$preprocessed_file"
    fi

    # 2) Split into 25-line chunks
    split -l "$CHUNK_LINES" -- "$preprocessed_file" "$temp_dir/chunk_"
    log "Split $file into chunks of $CHUNK_LINES lines each."

    # 3) Process each chunk
    for chunk_file in "$temp_dir"/chunk_*; do
      [[ -f "$chunk_file" ]] || continue
      log "Cleaning chunk: $(basename "$chunk_file")"

      {
        echo "Clean up the text, spelling errors, and transcription mistakes, without adding any commentary, summary, or boilerplate."
        echo "---------------"
        cat "$chunk_file"
      } | "${MODEL_COMMAND[@]}" | tee -a "$output_file"

      echo "" >> "$output_file"  # Add newline between processed chunks
    done

    log "Completed processing: $file -> $output_file"
    rm -rf "$temp_dir"
  done
}

#############################
#       Main Execution      #
#############################

process_files "$main_dir"

log "Script completed."
