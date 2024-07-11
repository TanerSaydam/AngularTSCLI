#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import { exec } from 'child_process';
import readline from 'readline';

const green = "\x1b[32m";
const yellow = "\x1b[33m";
const reset = "\x1b[0m";

let projectType = "";
let projectName = "";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const argv = yargs    
    .command("new", "Yeni bir Angular projesi oluştur",{
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
    .argv as { [key: string]: unknown, _: string[]};

if(argv._.includes("new")){
    projectName = argv.name as string;
    projectType = argv.template as string;

    console.log(``);

    if(!projectName){
        rl.question("Lütfen bir proje adı girin:", (inputName: string)=> {
            projectName = inputName;
            rl.close();
            createNewProject(projectName);
        });
    } else {
        createNewProject(projectName);
    }
} else {
    console.error("Geçersiz bir kod girdiniz. yardım için ts --help kodunu kullanabilirsiniz");
    process.exit(0);
}

const spinnerChars = ['|', '/', '-', '\\'];
let spinnerIndex = 0;

function startLoading(){
    return setInterval(() => {
        process.stdout.write(`\r${spinnerChars[spinnerIndex]}`);
        spinnerIndex = (spinnerIndex + 1) % spinnerChars.length;
    }, 100);
}

function stopLoading(interval: NodeJS.Timeout){
    clearInterval(interval);
    process.stdout.write('\r');
};

function createNewProject(projectName: string){
    if(!projectType){
        console.error("Geçersiz bir template adı girdiniz. Empty ya da AdminLTE yazmalısınız!");
        process.exit(0);
    }

    fs.mkdirSync(projectName);
    if(projectType === "AdminLTE"){
        setupAngularAdminLTE();
    } else if(projectType === "Empty"){
        setupEmptyAngular();
    } else {
        console.log("Geçersiz bir kod girdiniz. yardım için ts --help kodunu kullanabilirsiniz");
        process.exit(0);
    }
}

function setupEmptyAngular(){
    console.log("Proje GitHub reposu");    
    console.log(`${yellow}https://github.com/TanerSaydam/EmptyAngularTemplate${reset}`);
    console.log(``);    
    console.log("Proje indiriliyor...");
    let loaderInterval = startLoading();
    exec(`git clone https://github.com/TanerSaydam/EmptyAngularTemplate.git ${projectName}`, (error, stdout, stderr)=> {
        stopLoading(loaderInterval);
        if(error){
            console.error(`Error: ${stderr}`);
            process.exit(0);
        }

        console.log(`${green}√ Proje indirildi${reset}`);
        console.log("NPM paketleri indiriliyor...");
        loaderInterval = startLoading();

        exec(`cd ${projectName} && npm install`, (error, stdout, stderr)=> {
            stopLoading(loaderInterval);
            if(error){
                console.error(`Error: ${stderr}`);
                process.exit(0);
            }

            console.log(`${green}√ NPM paketleri indirildi${reset}`);
            console.log("Son ayarlar yapılıyor...");
            fs.rmdirSync(`${projectName}/.git`, { recursive: true });            
            console.log(`${green}√ Proje başarıyla oluşturuldu${reset}`);
            console.log(``);
            console.log(`${yellow}cd ${projectName}${reset}`);
            console.log(`komutuyla proje klasörüne gidip geliştirmeye başlayabilirsiniz`);
            console.log(``);
            console.log(`${reset}İyi çalışmalar`);
            console.log(`Taner Saydam${reset}`);

            process.exit(0);
        });
    });
}

function setupAngularAdminLTE(){
    console.log("Proje GitHub reposu");    
    console.log(`${yellow}https://github.com/TanerSaydam/AngularAdminLTETemplate${reset}`);
    console.log(``);    
    console.log("Proje indiriliyor...");
    let loaderInterval = startLoading();
    exec(`git clone https://github.com/TanerSaydam/AngularAdminLTETemplate.git ${projectName}`, (error, stdout, stderr)=> {
        stopLoading(loaderInterval);
        if(error){
            console.error(`Error: ${stderr}`);
            process.exit(0);
        }

        console.log(`${green}√ Proje indirildi${reset}`);
        console.log("NPM paketleri indiriliyor...");
        loaderInterval = startLoading();

        exec(`cd ${projectName} && npm install`, (error, stdout, stderr)=> {
            stopLoading(loaderInterval);
            if(error){
                console.error(`Error: ${stderr}`);
                process.exit(0);
            }

            console.log(`${green}√ NPM paketleri indirildi${reset}`);
            console.log("Son ayarlar yapılıyor...");
            fs.rmdirSync(`${projectName}/.git`, { recursive: true });            
            console.log(`${green}√ Proje başarıyla oluşturuldu${reset}`);
            console.log(``);
            console.log(`${yellow}cd ${projectName}${reset}`);
            console.log(`komutuyla proje klasörüne gidip geliştirmeye başlayabilirsiniz`);
            console.log(``);
            console.log(`${reset}İyi çalışmalar`);
            console.log(`Taner Saydam${reset}`);

            process.exit(0);
        });
    });
}
