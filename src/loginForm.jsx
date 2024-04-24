import './App.css';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReCAPTCHA from "react-google-recaptcha"

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const handleChange = (value) => {
    setRecaptchaValue(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length<5){
      setError(Swal.fire({
        title: 'Error',
        text: 'la contraseña debe tener al menos 5 caracteres',
        icon: 'warning', 
        confirmButtonText: 'Entendido',
      }))
      return;
    }
    if (username === 'admin@admin.com' && password === 'Admin'&& loginAttempts< 5) {
        Swal.fire({
            title: 'Éxito',
            text: "Bienvenido Administrador",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }else if(loginAttempts >= 5){
      Swal.fire({
        title: 'Error',
        text: 'Usuario bloquedo comuniquese con el administrador',
        icon: 'warning', 
        confirmButtonText: 'Entendido',
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña incorrecto',
        icon: 'warning', 
        confirmButtonText: 'Entendido',
        
      })
      setLoginAttempts(loginAttempts + 1)
    }
  };

  return (
    <div class = "body-page">
      <div class ="image-box">
        <img src="https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg" alt="doctor.jpg" width="820px" height="750px" />
      </div>
      <div class = "form-box"> 
        <div class = "Title">
            <h1>
             Iniciar sesión
            </h1>
            <small>
              Bienvenido al sistema de salud COOSALUD
            </small>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e)=> setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
          />
        <div>
        </div>
        <div class="col">
          <a href="#!">¿Olvidó su contraseña?</a>
        </div>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Recuerdame
          </label>
          
      </div>
      <ReCAPTCHA
      sitekey= "6LdubI8gAAAAAP6f-j__WJDl1b1b9mzSnkyUd9kE"
      onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">
        Iniciar Sesión
      </button>
      </form>
    </div>
    </div>
  )
}

export default LoginForm;
