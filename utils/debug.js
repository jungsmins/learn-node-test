const COLORS = [
  { name: "cyan", value: "\x1b[36m" },
  { name: "yellow", value: "\x1b[33m" },
  { name: "red", value: "\x1b[31m" },
  { name: "green", value: "\x1b[32m" },
  { name: "magenta", value: "\x1b[35m" },
];
const RESET_COLOR = "\x1b[0m";

const debug = (tag) => {
  if (!tag) {
    throw new Error("태그명이 필요합니다.");
  }

  const randIdx = Math.floor(Math.random() * COLORS.length);
  const color = COLORS[randIdx];

  return (msg) => {
    const log = `${color.value}${tag} ${RESET_COLOR}${msg}`;
    console.log(log);
    return log;
  };
};

module.exports = debug;
