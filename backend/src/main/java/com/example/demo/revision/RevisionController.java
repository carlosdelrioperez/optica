package com.example.demo.revision;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RevisionController {

    private final RevisionService revisionService;

    public RevisionController(RevisionService revisionService) {
        this.revisionService = revisionService;
    }

    // Crear una revisión
    @PostMapping("/revision")
    public Revision create(@RequestBody RevisionRequest request) {
        return revisionService.create(request.getFecha(), request.getGafaIzq(), request.getGafaDer(),
                request.getMaqIzq(), request.getMaqDer(), request.getLejIzq(), request.getLejDer(), request.getCerIzq(),
                request.getCerDer(),
                request.getCliente(),
                request.getOptico());
    }

    // Encontrar todas las revisiones
    @GetMapping("/revision")
    public List<Revision> getAllRevisiones() {
        return revisionService.findAll();
    }

    // Encontrar una revision
    @GetMapping("/revision/{id}")
    public Optional<Revision> getRevisionById(@PathVariable Integer id) {
        return revisionService.findRevisionById(id);
    }

    // Actualizar una revision
    @PutMapping("/revision/{id}")
    public Revision update(@PathVariable Integer id, @RequestBody RevisionRequest request) {
        return revisionService.update(id, request.getFecha(), request.getGafaIzq(), request.getGafaDer(),
                request.getMaqIzq(), request.getMaqDer(), request.getLejIzq(), request.getLejDer(), request.getCerIzq(),
                request.getCerDer(),
                request.getCliente(),
                request.getOptico());
    }

    // Eliminar una revision
    @DeleteMapping("/revision/{id}")
    public void deleteRevision(@PathVariable Integer id) {
        revisionService.deleteById(id);
    }

}
