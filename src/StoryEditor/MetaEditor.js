import React from "react";
import Debug from "@@/ui/Debug";
import "./MetaEditor.scss";

import { StoryConsumer } from "@@/data/StoryContext";
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
            addBlankShortcode
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
                      onShortcodeUpdated={(s, i) => updateShortcode(s, i)}
                    />
                  ))}
                  <button onClick={addBlankShortcode}>Add New Shortcode</button>
                </div>
              )}

              <Debug>{() => <pre>{JSON.stringify(meta, null, 1)}</pre>}</Debug>
            </div>
          );
        }}
      </StoryConsumer>
    );
  }
}

export default MetaEditor;
