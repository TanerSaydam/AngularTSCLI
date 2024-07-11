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
var green = "\x1b[32m";
var yellow = "\x1b[33m";
var reset = "\x1b[0m";
var projectType = "";
var projectName = "";
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
    projectName = argv.name;
    projectType = argv.template;
    console.log("");
    if (!projectName) {
        rl.question("Lütfen bir proje adı girin:", function (inputName) {
            projectName = inputName;
            rl.close();
            createNewProject(projectName);
        });
    }
    else {
        createNewProject(projectName);
    }
}
else {
    console.error("Geçersiz bir kod girdiniz. yardım için ts --help kodunu kullanabilirsiniz");
    process.exit(0);
}
var spinnerChars = ['|', '/', '-', '\\'];
var spinnerIndex = 0;
function startLoading() {
    return setInterval(function () {
        process.stdout.write("\r".concat(spinnerChars[spinnerIndex]));
        spinnerIndex = (spinnerIndex + 1) % spinnerChars.length;
    }, 100);
}
function stopLoading(interval) {
    clearInterval(interval);
    process.stdout.write('\r');
}
;
function createNewProject(projectName) {
    if (!projectType) {
        console.error("Geçersiz bir template adı girdiniz. Empty ya da AdminLTE yazmalısınız!");
        process.exit(0);
    }
    fs_1.default.mkdirSync(projectName);
    if (projectType === "AdminLTE") {
        setupAngularAdminLTE();
    }
    else if (projectType === "Empty") {
        setupEmptyAngular();
    }
    else {
        console.log("Geçersiz bir kod girdiniz. yardım için ts --help kodunu kullanabilirsiniz");
        process.exit(0);
    }
}
function setupEmptyAngular() {
    console.log("Proje GitHub reposu");
    console.log("".concat(yellow, "https://github.com/TanerSaydam/EmptyAngularTemplate").concat(reset));
    console.log("");
    console.log("Proje indiriliyor...");
    var loaderInterval = startLoading();
    (0, child_process_1.exec)("git clone https://github.com/TanerSaydam/EmptyAngularTemplate.git ".concat(projectName), function (error, stdout, stderr) {
        stopLoading(loaderInterval);
        if (error) {
            console.error("Error: ".concat(stderr));
            process.exit(0);
        }
        console.log("".concat(green, "\u221A Proje indirildi").concat(reset));
        console.log("NPM paketleri indiriliyor...");
        loaderInterval = startLoading();
        (0, child_process_1.exec)("cd ".concat(projectName, " && npm install"), function (error, stdout, stderr) {
            stopLoading(loaderInterval);
            if (error) {
                console.error("Error: ".concat(stderr));
                process.exit(0);
            }
            console.log("".concat(green, "\u221A NPM paketleri indirildi").concat(reset));
            console.log("Son ayarlar yapılıyor...");
            fs_1.default.rmdirSync("".concat(projectName, "/.git"), { recursive: true });
            console.log("".concat(green, "\u221A Proje ba\u015Far\u0131yla olu\u015Fturuldu").concat(reset));
            console.log("");
            console.log("".concat(yellow, "cd ").concat(projectName).concat(reset));
            console.log("komutuyla proje klas\u00F6r\u00FCne gidip geli\u015Ftirmeye ba\u015Flayabilirsiniz");
            console.log("");
            console.log("".concat(reset, "\u0130yi \u00E7al\u0131\u015Fmalar"));
            console.log("Taner Saydam".concat(reset));
            process.exit(0);
        });
    });
}
function setupAngularAdminLTE() {
    console.log("Proje GitHub reposu");
    console.log("".concat(yellow, "https://github.com/TanerSaydam/AngularAdminLTETemplate").concat(reset));
    console.log("");
    console.log("Proje indiriliyor...");
    var loaderInterval = startLoading();
    (0, child_process_1.exec)("git clone https://github.com/TanerSaydam/AngularAdminLTETemplate.git ".concat(projectName), function (error, stdout, stderr) {
        stopLoading(loaderInterval);
        if (error) {
            console.error("Error: ".concat(stderr));
            process.exit(0);
        }
        console.log("".concat(green, "\u221A Proje indirildi").concat(reset));
        console.log("NPM paketleri indiriliyor...");
        loaderInterval = startLoading();
        (0, child_process_1.exec)("cd ".concat(projectName, " && npm install"), function (error, stdout, stderr) {
            stopLoading(loaderInterval);
            if (error) {
                console.error("Error: ".concat(stderr));
                process.exit(0);
            }
            console.log("".concat(green, "\u221A NPM paketleri indirildi").concat(reset));
            console.log("Son ayarlar yapılıyor...");
            fs_1.default.rmdirSync("".concat(projectName, "/.git"), { recursive: true });
            console.log("".concat(green, "\u221A Proje ba\u015Far\u0131yla olu\u015Fturuldu").concat(reset));
            console.log("");
            console.log("".concat(yellow, "cd ").concat(projectName).concat(reset));
            console.log("komutuyla proje klas\u00F6r\u00FCne gidip geli\u015Ftirmeye ba\u015Flayabilirsiniz");
            console.log("");
            console.log("".concat(reset, "\u0130yi \u00E7al\u0131\u015Fmalar"));
            console.log("Taner Saydam".concat(reset));
            process.exit(0);
        });
    });
}
