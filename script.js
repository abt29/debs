document.addEventListener("DOMContentLoaded", function() {
    const directoryList = document.getElementById("directory-list");

    // Ganti 'your_directory_path' dengan path direktori yang ingin ditampilkan.
    //  Contoh: '/data/' atau '/path/to/your/directory/'
    const directoryPath = 'github.com/abt29/debs';

    // Fungsi untuk mengambil data direktori (simulasikan dengan data dummy)
    function getDirectoryData(path) {
        // Gantilah dengan pemanggilan API atau logika server untuk mengambil data direktori
        //  Contoh:  fetch(`/api/directory?path=${path}`)
        //  Contoh:  return new Promise(resolve => { ... });  // Simulasi data
        //  Contoh:  return [{name: "file1.txt", type: "file"}, {name: "folder1", type: "directory"}];

        return new Promise(resolve => {
            setTimeout(() => {
              const data = [
                { name: "file1.txt", type: "file" },
                { name: "folder1", type: "directory" },
                { name: "file2.jpg", type: "file" },
                { name: "folder2", type: "directory" }
              ];
              resolve(data);
            }, 200); // Simulate network delay
          });
    }

    // Fungsi untuk menampilkan daftar direktori
    function displayDirectory(data) {
        directoryList.innerHTML = ""; // Kosongkan daftar sebelum diisi
        data.forEach(item => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");

            if (item.type === "file") {
                link.textContent = item.name;
                link.href = "#"; // Tambahkan logika untuk membuka file jika diperlukan
            } else if (item.type === "directory") {
                link.textContent = item.name + "/";
                link.href = "#"; // Tambahkan logika untuk membuka direktori jika diperlukan
                link.addEventListener("click", (event) => {
                    event.preventDefault(); // Cegah navigasi default
                    getDirectoryData(item.name).then(newData => {
                        displayDirectory(newData);
                    });
                });
            }

            listItem.appendChild(link);
            directoryList.appendChild(listItem);
        });
    }


    // Memulai proses dengan mengambil data direktori awal
    getDirectoryData(directoryPath).then(data => {
        displayDirectory(data);
    });
});
