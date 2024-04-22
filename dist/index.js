#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var readline_1 = __importDefault(require("readline"));
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
var argv = yargs_1.default
    .command("new", "Yeni bir Angular projesi oluştur", {
    'template': {
        describe: "Template adı",
        demandOption: true,
        type: 'string',
        alias: 't'
    },
    'name': {
        describe: "Proje adı",
        demandOption: true,
        type: 'string',
        alias: 'n'
    }
})
    .help()
    .argv;
if (argv._.includes("new")) {
    var projectName_1 = argv.name;
    var projectType = argv.type;
    if (!projectType)
        projectType = "AdminLTE";
    if (!projectName_1) {
        rl.question("Lütfen bir proje adı girin:", function (inputName) {
            projectName_1 = inputName;
            rl.close();
            createNewProject(projectName_1);
        });
    }
    else {
        createNewProject(projectName_1);
    }
}
function createNewProject(projectName) {
    fs_1.default.mkdirSync(projectName);
    (0, child_process_1.exec)("git clone https://github.com/TanerSaydam/AngularAdminLTETemplate.git ".concat(projectName), function (error, stdout, stderr) {
        if (error) {
            console.error("Error: ".concat(stdout));
            return;
        }
        console.log("stdout: ".concat(stdout));
        console.error("stderr: ".concat(stderr));
        (0, child_process_1.exec)("cd ".concat(projectName, " && npm install"), function (error, stdout, stderr) {
            if (error) {
                console.error("Error: ".concat(stdout));
                return;
            }
            console.log("stdout: ".concat(stdout));
            console.error("stderr: ".concat(stderr));
        });
    });
}
