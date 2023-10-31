import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { InfinitySpin } from 'react-loader-spinner';

function App() {
  const [url, setUrl] = useState('')
  const [shortendUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const shortenUrl = async (e) => {
    e.preventDefault();

    if (url === '') return alert("Please provide a valid url!");
    try {
      setLoading(prev => !prev);
      const { data } = await axios.post('http://localhost:8000/api/short', {
        "origUrl": url
      }, {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      //console.log(data)

      setShortenedUrl(data);
      setLoading(prev => !prev)
    } catch (e) {
      alert(e);
    }
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shortendUrl);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error(
        "Unable to copy to clipboard.",
        err
      );
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div className="app">
      <div className='shortener'>
        <h2>URL shortener</h2>
        {/* Form to submit url */}
        <form>
          <input
            placeholder='Enter URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)} />
          <button onClick={shortenUrl}>Submit</button>
        </form>
        {/* Section to view shortened URLS */}
        {loading ? <InfinitySpin
          width='200'
          color="gray"
        /> : shortendUrl &&
        <div className='shortener__viewShot'>
          {shortendUrl}
          <button onClick={handleCopyClick}>|copy|</button>
        </div>
        }
      </div>
    </div>
  );
}

export default App;