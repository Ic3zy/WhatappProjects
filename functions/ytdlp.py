import sys
import yt_dlp

def search_youtube(query):
    ydl_opts = {
        'format': 'bestaudio/best',
        'noplaylist': True,
        'quiet': True,
        'extract_flat': True,  
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(f"ytsearch:{query}", download=False)
        if 'entries' in info_dict:
            video_url = info_dict['entries'][0]['url']
            return video_url
        else:
            raise Exception("No results found")

def download_video(url, output_path):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': output_path,
        'noplaylist': True,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Kullanım: python test.py <search_query>")
        sys.exit(1)

    search_query = ' '.join(sys.argv[1:])  
    output_filename = 'download'  
    print(f"Arama sorgusu: {search_query}")
    print(f"Çıktı dosyası: {output_filename}")

    try:
        video_url = search_youtube(search_query)
        print(f"Video URL: {video_url}")

        download_video(video_url, output_filename)
        print("İndirme tamamlandı.")
    except Exception as e:
        print(f"Hata: {e}")
