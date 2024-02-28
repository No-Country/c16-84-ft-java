package cohorte16.homeservice.services.impl;

import cohorte16.homeservice.dtos.ProfessionalDTO;
import cohorte16.homeservice.mappers.ProfessionalMapper;
import cohorte16.homeservice.models.Professional;
import cohorte16.homeservice.models.User;
import cohorte16.homeservice.repositories.ProfessionalRepository;
import cohorte16.homeservice.repositories.UserRepository;
import cohorte16.homeservice.services.ProfessionalService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ProfessionalServiceImpl implements ProfessionalService {

    private final ProfessionalRepository professionalRepository;
    private final ProfessionalMapper professionalMapper;
    private final UserRepository userRepository;

    public ProfessionalServiceImpl(ProfessionalRepository professionalRepository,
                                   UserRepository userRepository,
                                   ProfessionalMapper professionalMapper){
        this.professionalRepository = professionalRepository;
        this.userRepository = userRepository;
        this.professionalMapper = professionalMapper;
    }

    @Override
    public List<ProfessionalDTO> findAll() {
        List<ProfessionalDTO> professionalDTOs;
        try {
            List<Professional> professionalList = professionalRepository.findAll();
            professionalDTOs = professionalList.stream()
                       .map(professionalMapper::professionalToProfessionalDTO)
                       .toList();
           }catch (Exception e){
                throw new ServiceException("Error occurred while fetching all professionals", e);
        }
        return professionalDTOs;
    }

    @Override
    public ProfessionalDTO findById(Long id) {
        try {
            Professional professional = professionalRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Professional not found with id: " + id));
            return professionalMapper.professionalToProfessionalDTO(professional);
        } catch (EntityNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching professional with id: " + id, e);
        }
    }

    @Override
    public ProfessionalDTO save(ProfessionalDTO professionalDTO) {
        try {
            User userEntity = userRepository.findById(professionalDTO.user().getId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + professionalDTO.user().getId()));
            Professional professionalEntity = professionalMapper.professionalDTOToProfessional(professionalDTO);
            professionalEntity.setUser(userEntity);
            Professional professionalSaved = professionalRepository.save(professionalEntity);
            return professionalMapper.professionalToProfessionalDTO(professionalSaved);
        } catch (EntityNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ServiceException("Error occurred while saving professional", e);
        }
    }

    @Override
    public ProfessionalDTO update(Long id, ProfessionalDTO professionalDTO) {
        try {
            Professional existingProfessional = professionalRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Professional not found with id: " + id));
            Professional updatedProfessional = updateProfessionalFromDTO(existingProfessional, professionalDTO);
            Professional savedProfessional = professionalRepository.save(updatedProfessional);
            return professionalMapper.professionalToProfessionalDTO(savedProfessional);
        } catch (EntityNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ServiceException("Error occurred while updating professional with id: " + id, e);
        }
    }

    @Override
    public boolean delete(Long id) throws Exception {
        try {
            if(professionalRepository.existsById(id)){
                Professional professional = professionalRepository.findById(id).get();
                professional.setActive(Boolean.FALSE);
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public Professional updateProfessionalFromDTO(Professional existingProfessional,
                                                  ProfessionalDTO professionalDTO) {
        existingProfessional.setId(professionalDTO.id());
        existingProfessional.setName(professionalDTO.name());
        existingProfessional.setLastname(professionalDTO.lastname());
        existingProfessional.setCuit(professionalDTO.cuit());
        existingProfessional.setCbu(professionalDTO.cbu());
        existingProfessional.setRating(professionalDTO.rating());
        existingProfessional.setProfession(professionalDTO.profession());
        existingProfessional.setDirection(professionalDTO.direction());
        existingProfessional.setUser(professionalDTO.user());
        return existingProfessional;
    }
}