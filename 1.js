// ================= SETUP EVENT =================
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("mergeBtn")
        .addEventListener("click", mergeSortHandler);

    document.getElementById("quickBtn")
        .addEventListener("click", quickSortHandler);

    document.getElementById("linearBtn")
        .addEventListener("click", linearSearch);

    document.getElementById("binaryBtn")
        .addEventListener("click", binarySearch);

    document.getElementById("haloBtn")
        .addEventListener("click", halo);
});

// ================= HELPER =================
function getData() {
    return document.getElementById("dataInput").value
        .split(",")
        .map(x => Number(x.trim()))
        .filter(x => !isNaN(x));
}

// ================= MERGE SORT =================
function mergeSort(arr, log = []) {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid), log);
    let right = mergeSort(arr.slice(mid), log);

    return merge(left, right, log);
}

function merge(left, right, log) {
    let result = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }

    let merged = [...result, ...left, ...right];
    log.push("Merge: " + merged.join(", "));
    return merged;
}

function mergeSortHandler() {
    let data = getData();
    if (data.length === 0) return alert("Masukkan data dulu!");

    let log = [];
    let sorted = mergeSort([...data], log);

    showResult(data, sorted, log);
}

// ================= QUICK SORT =================
function quickSort(arr, log = []) {
    if (arr.length <= 1) return arr;

    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }

    log.push(`Pivot: ${pivot} | Kiri: ${left.join(", ")} | Kanan: ${right.join(", ")}`);

    return [
        ...quickSort(left, log),
        pivot,
        ...quickSort(right, log)
    ];
}

function quickSortHandler() {
    let data = getData();
    if (data.length === 0) return alert("Masukkan data dulu!");

    let log = [];
    let sorted = quickSort([...data], log);

    showResult(data, sorted, log);
}

// ================= LINEAR SEARCH =================
function linearSearch() {
    let data = getData();
    let target = Number(document.getElementById("searchInput").value);

    if (data.length === 0) return alert("Masukkan data dulu!");
    if (isNaN(target)) return alert("Masukkan angka yang dicari!");

    let log = [];

    for (let i = 0; i < data.length; i++) {
        log.push(`Cek ${data[i]}`);

        if (data[i] === target) {
            showResult(data, "Ditemukan di index " + i, log);
            return;
        }
    }

    showResult(data, "Tidak ditemukan", log);
}

// ================= BINARY SEARCH =================
function binarySearch() {
    let data = getData();
    let target = Number(document.getElementById("searchInput").value);

    if (data.length === 0) return alert("Masukkan data dulu!");
    if (isNaN(target)) return alert("Masukkan angka yang dicari!");

    let sorted = [...data].sort((a, b) => a - b);
    let log = [];

    let left = 0;
    let right = sorted.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        log.push(`Tengah: ${sorted[mid]}`);

        if (sorted[mid] === target) {
            showResult(sorted, "Ditemukan di index " + mid, log);
            return;
        }

        if (sorted[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    showResult(sorted, "Tidak ditemukan", log);
}

// ================= OUTPUT =================
function showResult(data, result, log) {
    document.getElementById("data").innerText = data.join(", ");
    document.getElementById("result").innerText = result;
    document.getElementById("log").innerText = log.join("\n");
}

// ================= TEST =================
function halo() {
    alert("Semua JS sudah terhubung!");
}