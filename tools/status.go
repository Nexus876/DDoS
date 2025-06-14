package main

import (
	"fmt"
	"net/http"
	"time"
	"os"
)

func checkWebsiteStatus(url string) {
	client := http.Client{
		Timeout: 10 * time.Second,
	}

	for {
		// Mengambil status website setiap 10 detik
		resp, err := client.Get(url)
		if err != nil {
			fmt.Printf("Gagal mengecek status code web, atau mungkin sudah down", err)
			return
		}
		defer resp.Body.Close()

		statusCode := resp.StatusCode
		statusText := http.StatusText(statusCode)

		// Menampilkan status code website
		fmt.Printf("URL: %s\nStatus Code: %d\nStatus Text: %s\n", url, statusCode, statusText)
		time.Sleep(10 * time.Second) // Interval 10 detik untuk pemindaian berikutnya
	}
}

func main() {
	var url string
	if len(os.Args) > 1 {
		url = os.Args[1]
	} else {
		fmt.Println("URL tidak diberikan. Gunakan format: go run status.go <url>")
		return
	}

	// Jalankan pemindaian dalam goroutine
	go checkWebsiteStatus(url)

	// Menunggu input untuk berhenti
	for {
		var input string
		fmt.Println("Ketik 'exit' untuk berhenti:")
		fmt.Scanln(&input)
		if input == "exit" || input == "EXIT" {
			fmt.Println("Pemindaian dihentikan...")
			break
		}
	}
}
