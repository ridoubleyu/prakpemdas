from flask import Flask, jsonify, render_template
import pandas as pd  # For reading and processing CSV
app = Flask(__name__)
@app.route('/')
def home():
    # Return proper HTML string (multi-line with triple quotes)
    return render_template("index.html")
@app.route('/data')
def get_data():
    try:
        # Baca CSV, lewati header NASA
        df = pd.read_csv('Bdg15-24.csv', skiprows=9)
        # Pastikan kolom sesuai
        df.columns = ['YEAR', 'MO', 'DY', 'T2M']

        data = df.to_dict('records')

        return jsonify({
             'city' : 'Bandung',
             'data' : data,
             'summary' : {
                 'period' : '2015-2024',
                 'overall_average' : round(df['T2M'].mean(), 1)
                }
            })
    except FileNotFoundError:
        return jsonify({'error': 'Data file not found. Please add Bdg15-24.csv to the project folder.'}), 404
    except Exception as e:
        print(f"Error in get_data: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
      app.run(debug=True, port=5000)