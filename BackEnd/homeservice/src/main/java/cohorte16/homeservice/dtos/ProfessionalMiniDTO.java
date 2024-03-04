package cohorte16.homeservice.dtos;

import cohorte16.homeservice.enums.Profession;

public record ProfessionalMiniDTO(
        Long id,
        String name,
        String lastname,
        Profession profession,
        Integer rating
) {
}
