# Build a CLI using Typescript

## Açıklama
Bu cli ile hazırladığım Angular (v18) proje templatelerini kolayca kurup kullanabilirsiniz

## Kurulum
Kurmak ve güncellemek için aşağıdaki kurulum kodunu konsolda çalıştırın

```bash
npm install -g angular-ts-cli
```

## Kullanım
Angular projesi oluşturmak istediğiniz klasöre girin ve aşağıdaki kodu çalıştırın.
Bu kod seçtiğiniz bir proje templatini klasöre kuracak

```ts
ts new -n my-app -t [AdminLTE | Empty]
//-n || --name => Proje adı => Bu optionsa proje adınızı vermeniz gerekiyor
//-t || --template => Template adı => Bu optionsa aşağıdaki template namelerden birini vermeniz gerekiyor
//Template names: AdminLTE
//Template names: Empty
```