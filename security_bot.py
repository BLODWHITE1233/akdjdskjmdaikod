import requests
from bs4 import BeautifulSoup

class SecurityAnalyzer:
    def _init_(self, url):
        self.url = url
        self.report = []

    def scan_all(self):
        self.check_sql_injection()
        self.check_xss()
        self.check_csrf()
        self.check_file_upload()
        self.scan_hidden_paths()
        self.extract_sensitive_data()
        self.check_lfi()
        self.check_idor()
        self.analyze_site_structure()
        self.detect_technologies()
        self.find_creator_info()
        return "\n".join(self.report)

    # Diğer fonksiyonlar buraya eklenecek...

def analyze_url(url):
    analyzer = SecurityAnalyzer(url)
    return analyzer.scan_all()

if _name_ == '_main_':
    import sys
    if len(sys.argv) > 1:
        url = sys.argv[1]
        print(analyze_url(url))
    else:
        print("Lütfen bir URL girin.")