#!/bin/bash

# Get the component name as an argument
COMPONENT_NAME="$1"
if [ -z "$COMPONENT_NAME" ]; then
    echo "Error: COMPONENT_NAME argument is required."
    exit 1
fi

# Prompt for other details
read -p "Enter Component Description: " COMPONENT_DESCRIPTION
read -p "Enter Sidebar Position (integer): " POSITION
read -p "Enter Storybook Folder: " STORYBOOK_FOLDER
read -p "Enter Figma URL: " FIGMA_URL

# Step 1: Define folders
TEMPLATE_DIR="./scripts/templates"
DESTINATION_DIR="./docs/components/$COMPONENT_NAME"
STORYBOOK_PATH="./../stories/$STORYBOOK_FOLDER/Docs.mdx"

# Step 2: Create destination directory
mkdir -p "$DESTINATION_DIR"

# Step 3:  Copy and replace in index.txt
sed -e "s|%COMPONENT_NAME%|$COMPONENT_NAME|g" \
    -e "s|%SIDEBAR_POSITION%|$POSITION|g" \
    -e "s|%COMPONENT_DESCRIPTION%|$COMPONENT_DESCRIPTION|g" \
    "$TEMPLATE_DIR/index.txt" > "$DESTINATION_DIR/index.mdx"

# Copy and replace in code.txt
sed -e "s|%COMPONENT_NAME%|$COMPONENT_NAME|g" \
    -e "s|%STORYBOOKS%|$STORYBOOK_PATH|g" \
    "$TEMPLATE_DIR/code.txt" > "$DESTINATION_DIR/code.tsx"



# STEP 4: Extracting node_id from the Figma URL
DECODED_URL=$(echo $FIGMA_URL | sed 's/%3A/:/g')
NODE_ID=$(echo $DECODED_URL | sed -E 's/.*node-id=([^&]*).*/\1/')

echo $NODE_ID
# Step 5: Run the JavaScript script to get the Figma URL
FIGMA_IMG_URL=$(node ./scripts/getFigmaImage.js "$NODE_ID")

# Step 6: Update components.json
jq '. += [{"name": "'$COMPONENT_NAME'", "node_id": "'$NODE_ID'", "figma_url": "'$FIGMA_IMG_URL'"}]' ./componentsJSON.json > ./components_temp.json && mv ./components_temp.json ./componentsJSON.json

# Print completion message
echo "Documentation for $COMPONENT_NAME created at $DESTINATION_DIR"

