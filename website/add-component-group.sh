#!/bin/bash

# Provide COMPONENT_GROUP name
if [ -z "$1" ]; then
  echo "Please provide a COMPONENT_GROUP name with underscores."
  exit 1
fi

COMPONENT_GROUP_ID=$1
COMPONENT_GROUP_DIR="./docs/component-groups/$COMPONENT_GROUP_ID"
TEMPLATE_DIR="./templates"


# Ask for additional details
read -p "Enter the COMPONENT_GROUP name: " COMPONENT_GROUP_NAME
read -p "Enter the COMPONENT_GROUP description: " COMPONENT_GROUP_DESCRIPTION
read -p "Enter the sidebar position: " POSITION
read -p "Enter the Storybook URL: " STORYBOOK_URL
read -p "Enter the FIGMA URL: " FIGMA_URL

# get the figma id and node id
    DECODED_URL=$(echo $FIGMA_URL | sed 's/%3A/:/g' | sed 's/%2F/\//g' | sed 's/%26/\&/g' | sed 's/%3F/?/g')

    # Extract the file ID
    FIGMA_ID=$(echo $DECODED_URL | grep -o 'file/[a-zA-Z0-9]*' | cut -d '/' -f 2)

    # Extract the node ID
    FIGMA_NODE=$(echo $DECODED_URL | grep -o 'node-id=[^&]*' | cut -d '=' -f 2)


# get the storybook id
STORYBOOK_ID=$(echo $STORYBOOK_URL | sed -n 's|.*/story/\([^?]*\).*|\1|p')

if [ -z "$STORYBOOK_ID" ]; then
    echo "Invalid Storybook URL or pattern not found."
    exit 1
fi

# Create COMPONENT_GROUP directory
mkdir -p "$COMPONENT_GROUP_DIR"

# Copy template files to the new COMPONENT_GROUP directory
cp "$TEMPLATE_DIR/index.mdx" "$COMPONENT_GROUP_DIR/index.mdx"
cp "$TEMPLATE_DIR/react.mdx" "$COMPONENT_GROUP_DIR/react.mdx"
cp "$TEMPLATE_DIR/constants.tsx" "$COMPONENT_GROUP_DIR/constants.tsx"
cp "$TEMPLATE_DIR/_category_.json" "$COMPONENT_GROUP_DIR/_category_.json"

# Replace placeholders in the template files
sed -i '' "s/99999/$POSITION/g" "$COMPONENT_GROUP_DIR/_category_.json"
sed -i '' "s/%COMPONENT_NAME%/$COMPONENT_GROUP_NAME/g" "$COMPONENT_GROUP_DIR/_category_.json"
sed -i '' "s/%COMPONENT_DESCRIPTION%/$COMPONENT_GROUP_DESCRIPTION/g" "$COMPONENT_GROUP_DIR/_category_.json"


sed -i '' "s/%COMPONENT_NAME%/$COMPONENT_GROUP_NAME/g" "$COMPONENT_GROUP_DIR/constants.tsx"
sed -i '' "s/%STORYBOOK_ID%/$STORYBOOK_ID/g" "$COMPONENT_GROUP_DIR/constants.tsx"
sed -i '' "s/%COMPONENT_DESCRIPTION%/$COMPONENT_GROUP_DESCRIPTION/g" "$COMPONENT_GROUP_DIR/constants.tsx"
sed -i '' "s/%FIGMA_ID%/$FIGMA_ID/g" "$COMPONENT_GROUP_DIR/constants.tsx"
sed -i '' "s/%FIGMA_NODE%/$FIGMA_NODE/g" "$COMPONENT_GROUP_DIR/constants.tsx"

sed -i '' "s/99999/$POSITION/g" "$COMPONENT_GROUP_DIR/react.mdx"
sed -i '' "s/99999/$POSITION/g" "$COMPONENT_GROUP_DIR/index.mdx"

# Update sidebar.ts
SIDEBAR_PATH="./sidebars.ts"
NEW_COMPONENT_GROUP=" ,'component-groups/${COMPONENT_ID}/index',
        {
          type: 'doc',
          id: 'component-groups/${COMPONENT_ID}/react',
          className: 'hide-from-sidebar'
        }
        "

sed -i '' "/\/\/ more-component-groups/i \\
$NEW_COMPONENT_GROUP
" "$SIDEBAR_PATH"


npm run lint --fix

echo "COMPONENT_GROUP $COMPONENT_GROUP_NAME created and added to sidebar."