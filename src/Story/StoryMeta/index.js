import React from "react";
import ShortcodeStyles from "./ShortcodeStyles";
import { StoryConsumer } from "@@/StoryContext";

class StoryMeta extends React.Component {
  render() {
    return (
      <StoryConsumer>
        {({ state: { storyData: { meta } } }) => (
          <div className="story-meta">
            <h1>
              {meta.title} <span className="author">by {meta.author}</span>
            </h1>
            <ShortcodeStyles shortcodes={meta.shortcodes} />
          </div>
        )}
      </StoryConsumer>
    );
  }
}

export default StoryMeta;
