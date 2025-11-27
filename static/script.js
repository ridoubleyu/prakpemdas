fetch('/data')
  .then(res => res.json())
  .then(json => {
    document.getElementById('summary').innerText = 
      `Rata-rata suhu keseluruhan: ${json.summary.overall_average}°C`;

    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: json.data.map(d => `${d.YEAR}-${d.MO}-${d.DY}`),
        datasets: [{
          label: 'Suhu Harian (°C)',
          data: json.data.map(d => d.T2M),
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 0,
          fill: {
            target: 'origin',
            above: 'rgba(255, 0, 0, 0.1)', // area bawah garis warna merah transparan
          },
          tension: 0.3 // bikin garis lebih smooth
        }]
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index', // hover ikut sumbu x
          intersect: false
        },
        plugins: {
          tooltip: {
            callbacks: {
              // tampilkan info lebih lengkap di tooltip
              label: (context) => {
                const date = json.data[context.dataIndex];
                return `${date.YEAR}-${date.MO}-${date.DY}: ${context.formattedValue}°C`;
              }
            }
          },
          legend: {
            labels: {
              font: { size: 14 }
            }
          }
        },
        animation: {
          duration: 1500, // animasi 1,5 detik
          easing: 'easeOutBounce'
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 12 // biar ga terlalu banyak tanggal
            }
          },
          y: {
            beginAtZero: false
          }
        }
      }
    });
  });
