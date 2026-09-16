# Kişisel site — blog + portföy + kütüphane

Jekyll ile yazılmış, GitHub Pages'te **ücretsiz** ve **derleme kurulumu olmadan** yayınlanan statik bir site.
Bilgisayarına hiçbir şey kurman gerekmiyor: dosyayı push'larsın, GitHub kendi sunucusunda derler.

---

## 1. Yayına alma (5 dakika)

1. GitHub'da yeni bir repo aç. Adı **tam olarak** şu olsun:
   `KemalYigitDemirci.github.io`
   Böylece site `https://kemalyigitdemirci.github.io` adresinde, kök dizinde yayınlanır.

2. Bu klasördeki **her şeyi** reponun köküne koy ve gönder:

   ```bash
   cd site
   git init
   git add .
   git commit -m "İlk kurulum"
   git branch -M main
   git remote add origin https://github.com/KemalYigitDemirci/KemalYigitDemirci.github.io.git
   git push -u origin main
   ```

   (Terminal kullanmak istemiyorsan: repo sayfasında **Add file → Upload files** ile klasörün içeriğini sürükleyip bırak.)

3. Repo → **Settings → Pages** → *Source*: **Deploy from a branch**, *Branch*: **main / (root)** → Save.

   > **Önemli:** Repo adı **tamamen küçük harf** olmalı: `kemalyigitdemirci.github.io`.
   > Büyük harfli olursa GitHub bunu kişisel site değil "proje sitesi" sanıyor ve bütün
   > bağlantıların başına `/RepoAdı/` ekliyor — CSS yüklenmiyor, site çıplak HTML gibi görünüyor.
   > Repo zaten kuruluysa: **Settings → General → Repository name** → küçük harfle yeniden adlandır.

4. 1–2 dakika sonra site yayında.

---

## 2. Önce şunları değiştir

`_config.yml` içinde `# <-- CHANGE ME` yazan satırlar:

| Satır | Ne yazacaksın |
|---|---|
| `github_username`, `url`, `social.github` | **Zaten senin hesabına göre dolduruldu** — dokunman gerekmiyor |
| `baseurl` | Repo adı `KemalYigitDemirci.github.io` ise **boş kalsın**. Başka bir isimse `"/repo-adi"` yaz |
| `author.email`, `author.location`, `author.blurb` | Kendi bilgilerin (şu an: Ankara + Hacettepe e-postan) |

Sonra `about.md` içindeki **"Fill this in before you publish"** bloğunu kendi cümlelerinle değiştir.

---

## 3. Yeni yazı eklemek

`_posts/` klasörüne `YYYY-AA-GG-baslik.md` adıyla bir dosya:

```markdown
---
title: "Yazının başlığı"
lang: tr                        # tr veya en — arşivdeki dil filtresi bunu kullanır
topics: [fizik, simülasyon]     # ilki etiket olarak görünür
standfirst: "Listelerde görünen bir-iki cümlelik özet."
math: true                      # LaTeX kullanacaksan; kullanmıyorsan false
---

Markdown ile yaz.
```

**Formül:** satır içi `$E=mc^2$`, ayrı satırda `$$ ... $$`. KaTeX tarayıcıda render eder — yalnızca `math: true` olan yazılarda yüklenir.

**Kod:** üç ters tırnak + dil adı (` ```python `). Renklendirme derleme sırasında yapılır.

---

## 4. Kütüphane (izlenen / okunan)

`_data/library.yml` — her kayıt için bir blok:

```yaml
- kind: Book            # Book / Film / Series / Paper / Talk / Album — serbest metin
  title: "Kitabın adı"
  by: "Yazar"
  year: 1979
  date: 2026-09-10      # SEN bitirdiğin tarih; sıralama buna göre
  rating: 4             # 1-5
  note: "Tek satır. Neden aklında kaldı?"
  link: "https://..."   # isteğe bağlı
```

Türleri sen belirliyorsun; filtre butonları listeden otomatik üretiliyor.

---

## 5. Projeler

- `/projects/` sayfası **GitHub API'sinden canlı çekiyor** — yeni repo açınca siteye dokunman gerekmiyor.
- Öne çıkmasını istediklerini `_data/projects.yml` dosyasına elle ekle.

---

## 6. Bilgisayarda önizleme (isteğe bağlı)

Ruby kuruluysa:

```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000
```

Kurulu değilse gerek de yok — push'layıp canlı siteden bakabilirsin.

---

## Dosya haritası

```
_config.yml          site ayarları
_data/library.yml    izlenen / okunan kayıtları
_data/projects.yml   öne çıkan projeler
_posts/              yazılar (Markdown)
_layouts/            sayfa şablonları
_includes/           üst bar, footer, head
assets/css/main.css  tüm tasarım — tek dosya, sade CSS
assets/js/site.js    tema anahtarı, filtreler, GitHub API
index.html           ana sayfa
posts.html           yazı arşivi (dil filtresi)
projects.html        portföy
library.html         kütüphane
about.md             hakkında
```

---

## Dil anahtarı (TR / EN)

Üst bardaki **TR/EN** düğmesi arayüz dilini değiştiriyor. Çalışma şekli basit:
şablonlarda iki dil de `<span class="tr">…</span><span class="en">…</span>` olarak yazılı,
CSS hangisinin görüneceğine karar veriyor, seçim tarayıcıda saklanıyor.
İlk girişte tarayıcı dili Türkçeyse TR, değilse EN açılıyor.

Yeni bir metin eklerken aynı kalıbı kullan:

```html
<span class="tr">Türkçe metin</span><span class="en">English text</span>
```

Yazıların kendisi çevrilmiyor — her yazı kendi dilinde duruyor ve `lang` etiketiyle işaretleniyor.

## Tasarım notu

Tipografi **Archivo** (başlıklar ve arayüz), **Source Serif 4** (yazı metinleri), **JetBrains Mono** (kod, tarih, sayı).
Palet soğuk gri kâğıt + tek bir mavi vurgu; sıcak/kil tonu bilinçli olarak yok.
Açık ve koyu tema ayrı ayrı tanımlı, seçim tarayıcıda hatırlanıyor. İzleyici yok, çerez yok, reklam yok.
