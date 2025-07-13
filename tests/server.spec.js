const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    
    //1 GET
    describe("Comprobacion de ruta GET /cafes", () => {
        it('Debe devolver un codigo 200 y un arreglo con al menos 1 objeto', async () => {
            const respuesta = await request(server).get('/cafes');
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toBeInstanceOf(Array);
            expect(respuesta.body.length).toBeGreaterThan(0);
        })
    })

    //2 Delete
    describe("Comprobacion de ruta DELETE /cafes/:id", () => {
        it("Debe devolver un codigo 404 al intentar eliminar un café que no existe", async () =>{
            const idFalso = 99;
            const respuesta = (await request(server).delete(`/cafes/${idFalso}`).set('Authorization', `Bearer token`));
            expect(respuesta.status).toBe(404);
        })
    })

    //3 POST
    describe("Comprobacion de la ruta POST /cafes", () =>{
        it("Al agregar un nuevo café debe devuelve un código 201", async () => {
            const cafe = {
                id: 99,
                nombre: "Café con leche sin lactosa, descafeinado con canela extra con vibracion exprimida, eje con grasa ligera hazlo llorar quemalo y dejalo nadar",
            };
            const respuesta = await request(server).post("/cafes").send(cafe);
            expect(respuesta.status).toBe(201);
        })
    })

    //4 PUT
    describe("Comprobacion de la ruta PUT /cafes", () => {
        it("Debe devolver un codigo 400 al actualizar un cafe con el parametro id diferente al entregado en el payload", async ()=>{
            const idParam = 1;
            const cafe = {
                id: 99,
                nombre: "Cafe estilo Bob Esponja"
            };
            const respuesta = (await request(server).put(`/cafes/${idParam}`).send(cafe));
           
            expect(respuesta.status).toBe(400);
        });
    })
});
