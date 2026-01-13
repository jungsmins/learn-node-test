const colors = [
  { name: "cyan", value: "\x1b[36m" },
  { name: "yellow", value: "\x1b[33m" },
  { name: "red", value: "\x1b[31m" },
  { name: "green", value: "\x1b[32m" },
  { name: "magenta", value: "\x1b[35m" },
];
const resetColor = "\x1b[0m";

const debug = (tag) => {
  const randIdx = Math.floor(Math.random() * colors.length) % colors.length;
  const color = colors[randIdx];

  if (!tag) {
    throw new Error("태그명이 필요합니다.");
  }

  return (msg) => {
    const log = `${color.value}${tag} ${resetColor}${msg}`;
    console.log(log);
    return log;
  };
};

debug("debug")("app is initiated");

module.exports = debug;
