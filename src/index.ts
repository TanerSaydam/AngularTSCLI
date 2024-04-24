#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import { exec } from 'child_process';
import readline from 'readline';
import { log } from 'console';

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
}else{
    console.log("Geçersiz bir kod girdiniz. yardım için ts --help kodunu kullanabilirsiniz");
    process.exit(0);
}

function createNewProject(projectName: string){
    fs.mkdirSync(projectName);
    console.log("Proje kalıbı indirilmeye başlandı...");
    exec(`git clone https://github.com/TanerSaydam/AngularAdminLTETemplate.git ${projectName}`, (error, stdout, stderr)=> {
        if(error){
            console.error(`Error: ${stdout}`)
            process.exit(0);
        }

       console.log("Proje kalıbı indirildi");
       console.log("NPM paketleri indiriliyor...");

        exec(`cd ${projectName} && npm install`, (error, stdout, stderr)=> {
            if(error){
                console.error(`Error: ${stdout}`)
                process.exit(0);
            }
    
            console.log("NPM paketleri indirildi");
            console.log("Son ayarlar yapılıyor...");
            fs.rmdirSync(`${projectName}/.git`, { recursive: true });            
            console.log("Proje başarıyla oluşturuldu.");
            console.log(`cd ${projectName} komutuyla proje klasörüne gidip geliştirmeye başlayabilrisiniz. İyi çalışmalar.`);
            process.exit(0);
        });
    });
}