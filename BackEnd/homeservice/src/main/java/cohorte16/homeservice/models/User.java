package cohorte16.homeservice.models;

import cohorte16.homeservice.dtos.RegistroUsuarioDTO;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "usuarios")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "email",nullable = false, unique = true )
    private String email;
    @Column(name = "contrasenia", nullable = false)
    private String password;
    @Column(name = "avatar")
    private String avatar;

    public User(RegistroUsuarioDTO registroUsuarioDTO) {
        this.email = registroUsuarioDTO.email();
        this.password = registroUsuarioDTO.password();
        this.avatar = registroUsuarioDTO.avatar();
    }
}