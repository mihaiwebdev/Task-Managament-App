import { useState, useEffect } from 'react'

const SetTheme = ({ screen }) => {

    const [theme, setTheme] = useState('light')

    useEffect(() => {
        
        if (localStorage.getItem('theme')) {

            setTheme(localStorage.getItem('theme'))
        }

        if (theme === 'light') {
            document.querySelector(`#ball-${screen}`).style.transform = 'translateX(0px)'
            document.documentElement.style.setProperty('--theme-body', 'var(--white-gray)') 
            document.documentElement.style.setProperty('--theme-navbar', 'var(--white)') 
            document.documentElement.style.setProperty('--theme-borders', 'var(--light-gray)') 
            document.documentElement.style.setProperty('--theme-text', 'var(--dark)') 
            document.documentElement.style.setProperty('--theme-linear', 'var(--linear-light)') 
            document.getElementById('logo').setAttribute("fill", "#000112")

        } else if (theme === 'dark') {
            document.querySelector(`#ball-${screen}`).style.transform = 'translateX(20px)'
            document.documentElement.style.setProperty('--theme-body', 'var(--light-dark)') 
            document.documentElement.style.setProperty('--theme-navbar', 'var(--dark-gray)')
            document.documentElement.style.setProperty('--theme-borders', 'var(--dark-gray-light)')  
            document.documentElement.style.setProperty('--theme-text', 'var(--white)')  
            document.documentElement.style.setProperty('--theme-linear', 'var(--linear-dark)')  
            document.getElementById('logo').setAttribute("fill", "#fff")
        }


    }, [theme, screen])
    
    const handleTheme = () => {
        
        if (theme === 'light') {
            setTheme('dark')
            
            localStorage.setItem('theme', 'dark')
        
        } else if (theme === 'dark') {
            setTheme('light')
            
            localStorage.setItem('theme', 'light')
        }

    }

    return (
         <div className='switch-theme mx-auto px-5'>
            <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z" fill="#828FA3"/></svg>

            <div>
                <input type="checkbox" className="checkbox" id="checkbox" />
                <label htmlFor="checkbox" className="label" onClick={handleTheme}>
                    <div id={`ball-${screen}`} className='ball'></div>
                </label>
            </div>

            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z" fill="#828FA3"/></svg>
        </div>
    )
}

export default SetTheme
