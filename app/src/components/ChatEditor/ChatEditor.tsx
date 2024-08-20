import classNames from 'classnames';
import React from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import styled from 'styled-components';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import ToolbarPlugin from './ToolBarPlugin';

const ExampleTheme = {
  code: 'editor-code',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
  },
  image: 'editor-image',
  link: 'editor-link',
  list: {
    listitem: 'editor-listitem',
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
  },
  ltr: 'ltr',
  paragraph: 'editor-paragraph',
  placeholder: 'editor-placeholder',
  quote: 'editor-quote',
  rtl: 'rtl',
  text: {
    bold: 'editor-text-bold',
    code: 'editor-text-code',
    hashtag: 'editor-text-hashtag',
    italic: 'editor-text-italic',
    overflowed: 'editor-text-overflowed',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
  },
};

const placeholder = 'Enter some rich text...';

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

interface ChatEditorProps {
  className?: string;
}

const StyledEditor = styled.div``;

const ChatEditor: React.FC<ChatEditorProps> = ({ className }) => {
  const wrapperClasses = classNames(
    'text-ex-text-primary border-[#565856] border-solid border-[1px] rounded-[8px] bg-[#222529] min-h-20',
    className,
  );

  return (
    <StyledEditor className={wrapperClasses}>
      <div>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="editor-container">
            <ToolbarPlugin />
            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="editor-input"
                    aria-placeholder={placeholder}
                    placeholder={<div className="editor-placeholder">{placeholder}</div>}
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          </div>
        </LexicalComposer>
      </div>
    </StyledEditor>
  );
};

export default ChatEditor;
