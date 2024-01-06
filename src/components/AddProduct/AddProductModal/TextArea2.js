import React from "react";

export default function TextArea2(props) {
  const { text, setText, user, type2, placeholder } = props;

  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          placeholder={placeholder}
          maxLength="1000"
          value={text}
          className={`post_input ${type2 ? "input2" : ""}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emoji_wrap" : ""}></div>
    </div>
  );
}
