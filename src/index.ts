#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import { exec } from 'child_process';
import readline from 'readline';

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
    let projectName = argv.name as string;
    let projectType = argv.type as string;

    if(!projectType) projectType = "AdminLTE";

    if(!projectName){
        rl.question("Lütfen bir proje adı girin:", (inputName: string)=> {
            projectName = inputName;
            rl.close();
            createNewProject(projectName);
        })
    }else{
        createNewProject(projectName);
    }
}

function createNewProject(projectName: string){
    fs.mkdirSync(projectName);

    exec(`git clone https://github.com/TanerSaydam/AngularAdminLTETemplate.git ${projectName}`, (error, stdout, stderr)=> {
        if(error){
            console.error(`Error: ${stdout}`)
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        exec(`cd ${projectName} && npm install`, (error, stdout, stderr)=> {
            if(error){
                console.error(`Error: ${stdout}`)
                return;
            }
    
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        })
    })
}