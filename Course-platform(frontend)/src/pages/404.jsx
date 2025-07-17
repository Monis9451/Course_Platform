import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', position: 'relative' }}>
            <img
                src="/404.jpg"
                alt="404 img"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
            
            <button
                onClick={handleGoHome}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#B45B29',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#D97E4F'
                    e.target.style.transform = 'translateX(-50%) translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#B45B29'
                    e.target.style.transform = 'translateX(-50%) translateY(0)'
                }}
            >
                Go to Home
            </button>
        </div>
    )
}

export default Error