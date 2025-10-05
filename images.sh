#!/bin/bash

# Output file
OUTPUT_FILE="images-list.js"

# Start the JS array
echo "const imageList = [" > "$OUTPUT_FILE"

# Get a list of images
images=(./images/*.{png,jpg,jpeg,gif})

# Loop through images with proper comma handling
for i in "${!images[@]}"; do
    img="${images[$i]}"
    # Skip if no files found
    [ -e "$img" ] || continue
    if [ "$i" -eq $((${#images[@]} - 1)) ]; then
        # Last element, no comma
        echo "  \"$img\"" >> "$OUTPUT_FILE"
    else
        echo "  \"$img\"," >> "$OUTPUT_FILE"
    fi
done

# Close the array
echo "];" >> "$OUTPUT_FILE"

echo "images-list.js has been updated!"
