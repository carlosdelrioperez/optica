package com.example.demo.configuration;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.cliente.Role;
import com.example.demo.color.Color;
import com.example.demo.color.ColorRepository;
import com.example.demo.hora.Hora;
import com.example.demo.hora.HoraRepository;
import com.example.demo.optico.Optico;
import com.example.demo.optico.OpticoRepository;
import com.example.demo.producto.Genero;
import com.example.demo.producto.Producto;
import com.example.demo.producto.ProductoRepository;

@Service
public class DataInitializer implements CommandLineRunner {

    private final OpticoRepository opticoRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProductoRepository productoRepository;
    private final HoraRepository horaRepository;
    private final ColorRepository colorRepository;

    public DataInitializer(OpticoRepository opticoRepository, PasswordEncoder passwordEncoder,
            ProductoRepository productoRepository, HoraRepository horaRepository, ColorRepository colorRepository) {
        this.opticoRepository = opticoRepository;
        this.passwordEncoder = passwordEncoder;
        this.productoRepository = productoRepository;
        this.horaRepository = horaRepository;
        this.colorRepository = colorRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Crea un nuevo óptico
        if (opticoRepository.count() == 0) {
            Optico nuevoOptico = new Optico();
            nuevoOptico.setNombre("Carlos");
            nuevoOptico.setApellidos("del Río Pérez");
            nuevoOptico.setColegiado(4000);
            nuevoOptico.setDomicilio("Abenamar, 4");
            nuevoOptico.setEmail("carlosdelrioperez00@gmail.com");
            String fechaCadena = "2000-12-06";
            LocalDate fecha = LocalDate.parse(fechaCadena);
            nuevoOptico.setFechaNacimiento(fecha);
            String encodedPassword = passwordEncoder.encode("contraseña");
            nuevoOptico.setPassword(encodedPassword); // Establece la contraseña codificada
            nuevoOptico.setRole(Role.ADMIN);
            nuevoOptico.setTelefono(648158865);
            opticoRepository.save(nuevoOptico);
        }

        // Crea productos
        if (productoRepository.count() == 0) {
            Producto producto1 = new Producto();
            producto1.setNombre("Gafa de sol");
            producto1.setDescripcion("descripción");
            producto1.setGenero(Genero.GAFAS_SOL);
            producto1.setFoto(
                    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            producto1.setMarca("Hugo Boss");
            producto1.setPrecio(150);
            producto1.setStock(10);
            productoRepository.save(producto1);
            Producto producto2 = new Producto();
            producto2.setNombre("Gafa de sol 2");
            producto2.setDescripcion("descripción");
            producto2.setGenero(Genero.GAFAS_SOL);
            producto2.setFoto(
                    "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            producto2.setMarca("Lacoste");
            producto2.setPrecio(100);
            producto2.setStock(5);
            productoRepository.save(producto2);
            Producto producto3 = new Producto();
            producto3.setNombre("Gafa de sol 3");
            producto3.setDescripcion("descripción");
            producto3.setGenero(Genero.GAFAS_SOL);
            producto3.setFoto(
                    "https://images.unsplash.com/photo-1523754865311-b886113bb8de?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            producto3.setMarca("Lacoste");
            producto3.setPrecio(70);
            producto3.setStock(6);
            productoRepository.save(producto3);
            Producto producto4 = new Producto();
            producto4.setNombre("Gafa graduada");
            producto4.setDescripcion("descripción");
            producto4.setGenero(Genero.GAFAS_GRADUADAS);
            producto4.setFoto(
                    "https://plus.unsplash.com/premium_photo-1683543124406-ff29013727f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            producto4.setMarca("Lacoste");
            producto4.setPrecio(100);
            producto4.setStock(15);
            productoRepository.save(producto4);
            Producto producto5 = new Producto();
            producto5.setNombre("Gafa graduada 2");
            producto5.setDescripcion("descripción");
            producto5.setGenero(Genero.GAFAS_GRADUADAS);
            producto5.setFoto(
                    "https://plus.unsplash.com/premium_photo-1668046135252-92e57158eb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGdhZmFzfGVufDB8fDB8fHww");
            producto5.setMarca("Hugo Boss");
            producto5.setPrecio(150);
            producto5.setStock(12);
            productoRepository.save(producto5);
            Producto producto6 = new Producto();
            producto6.setNombre("Gafa deportiva");
            producto6.setDescripcion("descripción");
            producto6.setGenero(Genero.GAFAS_DEPORTIVAS);
            producto6.setFoto(
                    "https://plus.unsplash.com/premium_photo-1672883552600-a2bfa0a34fbf?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            producto6.setMarca("Quechua");
            producto6.setPrecio(50);
            producto6.setStock(5);
            productoRepository.save(producto6);
            Producto producto7 = new Producto();
            producto7.setNombre("Lentillas Alcon");
            producto7.setDescripcion("descripción");
            producto7.setGenero(Genero.LENTILLAS);
            producto7.setFoto(
                    "https://cdn.alensa.es/imagesCdn/2093/12169-800x600.webp");
            producto7.setMarca("Alcon");
            producto7.setPrecio(10);
            producto7.setStock(7);
            productoRepository.save(producto7);
            Producto producto8 = new Producto();
            producto8.setNombre("Funda de gafa");
            producto8.setDescripcion("descripción");
            producto8.setGenero(Genero.ACCESORIOS);
            producto8.setFoto(
                    "https://images.unsplash.com/photo-1630659115277-c17c05440e01?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
            producto8.setMarca("Ray Ban");
            producto8.setPrecio(20);
            producto8.setStock(10);
            productoRepository.save(producto8);
            // Crear colores
            if (colorRepository.count() == 0) {
                Color color1 = new Color();
                color1.setColor("Negro");
                color1.setProducto(producto1);
                colorRepository.save(color1);
                Color color2 = new Color();
                color2.setColor("Azul");
                color2.setProducto(producto1);
                colorRepository.save(color2);
                Color color3 = new Color();
                color3.setColor("Negro");
                color3.setProducto(producto2);
                colorRepository.save(color3);
                Color color4 = new Color();
                color4.setColor("Negro");
                color4.setProducto(producto3);
                colorRepository.save(color4);
                Color color5 = new Color();
                color5.setColor("Rojo");
                color5.setProducto(producto4);
                colorRepository.save(color5);
                Color color6 = new Color();
                color6.setColor("Negro");
                color6.setProducto(producto5);
                colorRepository.save(color6);
                Color color7 = new Color();
                color7.setColor("Negro");
                color7.setProducto(producto6);
                colorRepository.save(color7);
                Color color8 = new Color();
                color8.setColor("No color");
                color8.setProducto(producto7);
                colorRepository.save(color8);
                Color color9 = new Color();
                color9.setColor("Rojo");
                color9.setProducto(producto8);
                colorRepository.save(color9);
                Color color10 = new Color();
                color10.setColor("Negro");
                color10.setProducto(producto8);
                colorRepository.save(color10);
            }
        }
        // Crear horas
        if (horaRepository.count() == 0) {
            Hora hora1 = new Hora();
            String horaCadena1 = "10:00";
            LocalTime horaLocalTime1 = LocalTime.parse(horaCadena1);
            hora1.setHora(horaLocalTime1);
            horaRepository.save(hora1);
            Hora hora2 = new Hora();
            String horaCadena2 = "10:30";
            LocalTime horaLocalTime2 = LocalTime.parse(horaCadena2);
            hora2.setHora(horaLocalTime2);
            horaRepository.save(hora2);
            Hora hora3 = new Hora();
            String horaCadena3 = "11:00";
            LocalTime horaLocalTime3 = LocalTime.parse(horaCadena3);
            hora3.setHora(horaLocalTime3);
            horaRepository.save(hora3);
            Hora hora4 = new Hora();
            String horaCadena4 = "11:30";
            LocalTime horaLocalTime4 = LocalTime.parse(horaCadena4);
            hora4.setHora(horaLocalTime4);
            horaRepository.save(hora4);
            Hora hora5 = new Hora();
            String horaCadena5 = "12:00";
            LocalTime horaLocalTime5 = LocalTime.parse(horaCadena5);
            hora5.setHora(horaLocalTime5);
            horaRepository.save(hora5);
            Hora hora6 = new Hora();
            String horaCadena6 = "12:30";
            LocalTime horaLocalTime6 = LocalTime.parse(horaCadena6);
            hora6.setHora(horaLocalTime6);
            horaRepository.save(hora6);
            Hora hora7 = new Hora();
            String horaCadena7 = "13:00";
            LocalTime horaLocalTime7 = LocalTime.parse(horaCadena7);
            hora7.setHora(horaLocalTime7);
            horaRepository.save(hora7);
            Hora hora8 = new Hora();
            String horaCadena8 = "17:00";
            LocalTime horaLocalTime8 = LocalTime.parse(horaCadena8);
            hora8.setHora(horaLocalTime8);
            horaRepository.save(hora8);
            Hora hora9 = new Hora();
            String horaCadena9 = "17:30";
            LocalTime horaLocalTime9 = LocalTime.parse(horaCadena9);
            hora9.setHora(horaLocalTime9);
            horaRepository.save(hora9);
            Hora hora10 = new Hora();
            String horaCadena10 = "18:00";
            LocalTime horaLocalTime10 = LocalTime.parse(horaCadena10);
            hora10.setHora(horaLocalTime10);
            horaRepository.save(hora10);
            Hora hora11 = new Hora();
            String horaCadena11 = "18:30";
            LocalTime horaLocalTime11 = LocalTime.parse(horaCadena11);
            hora11.setHora(horaLocalTime11);
            horaRepository.save(hora11);
            Hora hora12 = new Hora();
            String horaCadena12 = "19:00";
            LocalTime horaLocalTime12 = LocalTime.parse(horaCadena12);
            hora12.setHora(horaLocalTime12);
            horaRepository.save(hora12);
            Hora hora13 = new Hora();
            String horaCadena13 = "19:30";
            LocalTime horaLocalTime13 = LocalTime.parse(horaCadena13);
            hora13.setHora(horaLocalTime13);
            horaRepository.save(hora13);
            Hora hora14 = new Hora();
            String horaCadena14 = "20:00";
            LocalTime horaLocalTime14 = LocalTime.parse(horaCadena14);
            hora14.setHora(horaLocalTime14);
            horaRepository.save(hora14);
        }

    }
}
