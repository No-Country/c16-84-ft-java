package cohorte16.homeservice.models;


import cohorte16.homeservice.dtos.ClientDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "clientes")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    @NotBlank
    private String name;

    @Column(name = "apellido")
    @NotBlank
    private String lastname;

    @Column(name = "dni")
    @NotBlank
    private String dni;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_usuario_id")
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cliente_direccion_id")
    private Direction direction;

    @Column(name = "clasificacion")
    private Integer rating;

    @Column(name = "activo")
    private Boolean active = true;


    public Client(ClientDTO clientDTO) {

        this.name = clientDTO.name();
        this.lastname = clientDTO.lastname();
        this.dni = clientDTO.dni();
        this.user = clientDTO.user();
        this.direction = clientDTO.direction();
        this.rating = clientDTO.rating();

    }
}
