//cargue la conexion del grupo MySQL
const pool = require('../data/config');

// ruta de la app
const router = app =>{
    //mostrar mensaje de bienvenida de root
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a Node.js Epress REST API'
        });
    });
    //mostrar todos los usuarios
    app.get('/users', (request, response) =>{
        pool.query('SELECT * FROM users', (error, result) =>{
            if(error) throw error;

            response.send(result);
        });
    });
    //mostrar por id
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id =  ?', id, (error, result) => {
            if(error) throw error;

            response.send(result);
        });
    });

    //agregar usuario
    app.post('/users', (request, response) =>{
        pool.query('INSERT INTO users SET ?', request.body, (error, result) =>{
            if(error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    //actualizar usuario
    app.put('/users/:id', (request, response) =>{
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id],(error, result) => {
            if(error) throw error;

            response.send('User updated succesfully');
        });
    });

    //eliminar usuario
    app.delete('/users/:id', (request, response) =>{
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id ,(error, result) => {
            if(error) throw error;

            response.send('User deleted');
        });
    });
    
}

//rutas para el manejo de escuelas
//mostrar todos los usuarios
app.get('/escuelas', (request, response) =>{
    pool.query('SELECT * FROM escuelas', (error, result) =>{
        if(error) throw error;

        response.send(result);
    });
});

 //mostrar por id
 app.get('/escuelas/:id', (request, response) => {
    const id = request.params.id;

    pool.query('SELECT * FROM escuelas WHERE id =  ?', id, (error, result) => {
        if(error) throw error;

        response.send(result);
    });
});
  //agregar escuela
  app.post('/escuelas', (request, response) =>{
    pool.query('INSERT INTO escuelas SET ?', request.body, (error, result) =>{
        if(error) throw error;

        response.status(201).send(`School added with ID: ${result.insertId}`);
    });
});

    //actualizar escuela
    app.put('/escuelas/:id', (request, response) =>{
        const id = request.params.id;

        pool.query('UPDATE escuelas SET ? WHERE id = ?', [request.body, id],(error, result) => {
            if(error) throw error;

            response.send('school updated succesfully');
        });
    });

    //eliminar escuela
    app.delete('/escuelas/:id', (request, response) =>{
        const id = request.params.id;

        pool.query('DELETE FROM escuelas WHERE id = ?', id ,(error, result) => {
            if(error) throw error;

            response.send('School deleted');
        });
    });

//exportar router
module.exports = router;