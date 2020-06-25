/* 
the purpose of this file is to allow some typescript in .svelte files.
However, its usage is limited; if the script contains non-standard stuff like the special mark `$:`,
the typescript compiler fails.
*/
const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({}),
};
