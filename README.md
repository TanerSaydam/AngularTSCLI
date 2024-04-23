# Build a CLI using Typescript

## Açıklama
Bu cli ile hazırladığım Angular (v17) proje templatelerini kolayca kurup kullanabilirsiniz

## Kurulum
Kurmak ve güncellemek için aşağıdaki kurulum kodunu konsolda çalıştırın

```bash
npm install -g angular-ts-cli
```

## Kullanım
Angular projesi oluşturmak istediğiniz klasöre girin ve aşağıdaki kodu çalıştırın.
Bu kod seçtiğiniz bir proje templatini klasöre kuracak

```ts
ts new -t AdminLTE -n my-app
//-t || --template => Template adı => Bu optionsa aşağıdaki template namelerden birini vermeniz gerekiyor
//Template names: AdminLTE
//-n || --name => Proje adı => Bu optionsa proje adınızı vermeniz gerekiyor
```

## Tema Detaları
- **Components** 
- Layouts yapısı kurulu ve her bir parçası ayrı bir componente ayrılmış durumda
- Blank ve section generic componentleri ile yeni oluşturacağınız sayfalara hızlıca blank tasarımı giydirebilirsiniz
- Login sayfası giriş için yeterli düzeyde hazır. Sadece endpointi değiştirmeniz yeterli
** Login sayfasında Email ya da UserName giriş için isteniyor. Sizde sadece biri ya da daha farklısı isteniyorsa model kısmından düzeltebilirsiniz

- **Services**
- API istekleri için generic bir HTTP Service yapısı kurulu
- Sweetalert ile Fire ve Toast kullanabileceğiniz generic bir service var
- Error handler ile hatalarınızı ayrı bir şekilde işleyebileceğiniz bir service mevcut
- Auth servici authentication kontrolü ve Token decode için var
