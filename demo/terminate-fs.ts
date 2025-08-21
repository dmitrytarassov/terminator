import fs from "fs";

import { terminate } from "@/index";

terminate(fs, "fs");

const data = fs.readFileSync("/tmp/secret", "utf-8");
console.log("data:", data);
