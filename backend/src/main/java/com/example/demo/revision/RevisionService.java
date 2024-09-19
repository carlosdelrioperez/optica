package com.example.demo.revision;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.cliente.Cliente;
import com.example.demo.optico.Optico;
import jakarta.persistence.EntityNotFoundException;

@Service
public class RevisionService {

    private final RevisionRepository revisionRepository;

    public RevisionService(RevisionRepository revisionRepository) {
        this.revisionRepository = revisionRepository;
    }

    public Revision create(LocalDate fecha, Integer gafaIzq, Integer gafaDer, Integer maqIzq, Integer maqDer,
            Integer lejIzq, Integer lejDer,
            Integer cerIzq, Integer cerDer, Cliente cliente, Optico optico) {
        Revision r = Revision.builder()
                .fecha(fecha)
                .gafaIzq(gafaIzq)
                .gafaDer(gafaDer)
                .maqIzq(maqIzq)
                .maqDer(maqDer)
                .lejIzq(lejIzq)
                .lejDer(lejDer)
                .cerIzq(cerIzq)
                .cerDer(cerDer)
                .cliente(cliente)
                .optico(optico)
                .build();
        Revision nuevaRevision = revisionRepository.save(r);
        return nuevaRevision;
    }

    public List<Revision> findAll() {
        return revisionRepository.findAll();
    }

    public List<Revision> findRevisionesByClienteId(Integer id) {
        return revisionRepository.findRevisionesByClienteId(id);
    }

    public Optional<Revision> findRevisionById(Integer id) {
        return revisionRepository.findById(id);
    }

    public Revision update(Integer id, LocalDate fecha, Integer gafaIzq, Integer gafaDer, Integer maqIzq,
            Integer maqDer,
            Integer lejIzq, Integer lejDer,
            Integer cerIzq, Integer cerDer, Cliente cliente, Optico optico) {
        Revision revisionExistente = revisionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Revisión no encontrado con ID: " + id));
        revisionExistente.setFecha(fecha);
        revisionExistente.setGafaIzq(gafaIzq);
        revisionExistente.setGafaDer(gafaDer);
        revisionExistente.setMaqIzq(maqIzq);
        revisionExistente.setMaqDer(maqDer);
        revisionExistente.setLejIzq(lejIzq);
        revisionExistente.setLejDer(lejDer);
        revisionExistente.setCerIzq(cerIzq);
        revisionExistente.setCerDer(cerDer);
        revisionExistente.setCliente(cliente);
        revisionExistente.setOptico(optico);
        return revisionRepository.save(revisionExistente);
    }

    public void deleteById(Integer id) {
        revisionRepository.deleteById(id);
    }

}
