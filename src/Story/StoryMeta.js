import React from "react";
import ShortcodeStyles from "./ShortcodeStyles";
import { StoryConsumer } from "@@/data/StoryContext";

class StoryMeta extends React.Component {
  render() {
    return (
      <StoryConsumer>
        {({ state: { storyData: { meta } } }) => (
          <div className="story-meta">
            <h1>{meta.title}</h1>
            <h5>{meta.author}</h5>
            <ShortcodeStyles shortcodes={meta.shortcodes} />
          </div>
        )}
      </StoryConsumer>
    );
  }
}

export default StoryMeta;
