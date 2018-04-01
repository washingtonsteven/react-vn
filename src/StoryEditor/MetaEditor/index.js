import React from "react";
import "./MetaEditor.scss";

import { StoryConsumer } from "@@/StoryContext";
import ShortcodeEditor from "./ShortcodeEditor";

class MetaEditor extends React.Component {
  render() {
    return (
      <StoryConsumer>
        {({
          state: { storyData: { meta = {} } },
          actions: {
            updateStoryTitle,
            updateStoryAuthor,
            updateShortcode,
            addBlankShortcode,
            deleteShortcode
          }
        }) => {
          return (
            <div className="meta-editor">
              <label htmlFor="story-title">
                <span>Story Title</span>
                <input
                  type="text"
                  defaultValue={meta.title}
                  id="story-title"
                  onChange={e => updateStoryTitle(e.target.value)}
                />
              </label>
              <label htmlFor="story-author">
                <span>Story Author</span>
                <input
                  type="text"
                  defaultValue={meta.author}
                  id="story-author"
                  onChange={e => updateStoryAuthor(e.target.value)}
                />
              </label>
              {meta.shortcodes && (
                <div className="shortcode-editors">
                  {meta.shortcodes.map((s, i) => (
                    <ShortcodeEditor
                      key={i}
                      shortcode={s}
                      shortcodeIndex={i}
                      onShortcodeUpdated={(sh, idx) => updateShortcode(sh, idx)}
                      onShortcodeDeleted={index => deleteShortcode(index)}
                    />
                  ))}
                </div>
              )}
              <button onClick={addBlankShortcode}>Add New Shortcode</button>
            </div>
          );
        }}
      </StoryConsumer>
    );
  }
}

export default MetaEditor;
