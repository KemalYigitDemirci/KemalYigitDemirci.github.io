---
title: "Bu site nasıl çalışıyor"
lang: tr
topics: [meta, jekyll]
standfirst: "Bir klasör dolusu metin dosyası, bir static site generator ve ücretsiz bir sunucu. Arkasında başka bir şey yok — ve asıl güzel tarafı bu."
math: false
---

Bu sitenin tamamı metin dosyalarından ibaret. Veritabanı yok, yönetim paneli yok, aylık ücret yok. Yeni bir yazı yazmak, klasöre bir dosya eklemek demek. Nasıl işlediğini bir kere yazayım ki altı ay sonra kendime sormak zorunda kalmayayım.

## Yeni yazı eklemek

`_posts/` klasörüne `YYYY-AA-GG-baslik.md` biçiminde bir dosya aç. Başına şu bloğu koy:

```yaml
---
title: "Yazının başlığı"
lang: tr                      # tr veya en
topics: [fizik, simülasyon]   # ilki etiket olarak görünür
standfirst: "Listelerde görünen bir-iki cümlelik özet."
math: true                    # LaTeX kullanacaksan
---
```

Altına Markdown ile yaz. `git push` yaptığın anda GitHub siteyi kendi sunucusunda derliyor; bir dakika içinde yayında oluyor.

## Formüller

`math: true` yazdığın yazılarda KaTeX devreye giriyor. Satır içinde `$E = mc^2$`, ayrı satırda `$$ ... $$`. Tarayıcıda render ediliyor, yani derleme aşamasında hiçbir şey yavaşlamıyor.

## Kütüphane ve projeler

İzlediklerim ve okuduklarım `_data/library.yml` dosyasında duruyor — her kayıt için tür, başlık, tarih, beş üzerinden bir not ve **tek satırlık** bir yorum. Tek satır sınırı bilinçli: iki cümle yazmaya kalkarsam hiç yazmıyorum.

Projeler sayfası ise GitHub API'sinden canlı çekiyor. Yeni bir repo açtığımda siteye dokunmama gerek yok, kendi kendine listeye giriyor. Öne çıkmasını istediklerimi `_data/projects.yml` dosyasına elle ekliyorum.

## Neden Jekyll

Çünkü GitHub Pages onu kendi sunucusunda derliyor — bilgisayarıma hiçbir şey kurmam gerekmiyor. Bir dosya yazıp push'luyorum, gerisi hallediliyor. Astro ya da Hugo daha hızlı olabilir ama her ikisi de bir derleme adımı ve bir CI dosyası istiyor. Bu sitenin yükü, taşıması gereken ağırlıktan fazla olmamalı.

> Bir aracın en iyi tarafı, çoğu zaman yapmadığı şeylerdir.

Bir de şu var: her şey düz metin olduğu için on yıl sonra da açılır. Notion'dan, Medium'dan, ismini bugün bilmediğim bir platformdan farkı bu.

---

*Bu, sitenin ilk yazısı ve biraz da kurulum notu. Kendi yazılarını eklemeye başlayınca silebilirsin — ya da bırak dursun, ileride bir ihtiyacın olur.*
