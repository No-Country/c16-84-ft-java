package cohorte16.homeservice.dtos;



import cohorte16.homeservice.models.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record RegistroUsuarioDTO(Long id, @NotBlank String email, @NotBlank String contrasenia, String avatar) {
    public RegistroUsuarioDTO(User userCreated) {
        this(userCreated.getId(),userCreated.getEmail(),userCreated.getContrasenia(),userCreated.getAvatar());
    }

}
