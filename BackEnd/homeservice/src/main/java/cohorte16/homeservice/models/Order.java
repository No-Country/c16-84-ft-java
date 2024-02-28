package cohorte16.homeservice.models;

import cohorte16.homeservice.dtos.OrderDTO;
import cohorte16.homeservice.dtos.OrderProfessionalDTO;
import cohorte16.homeservice.enums.Orderstatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ordenes")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion")
    private String description;

    @ManyToOne
    @JoinColumn(name = "profesional_id", referencedColumnName = "id")
    private Professional professional;

    @Column(name = " descripcion_profesional")
    private String description_professional;

    @Column(name = "precio")
    @DecimalMin(value = "0.01")
    private BigDecimal price;

    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    private Date date =  new Date();

    @Column(name = "ESTADO")
    @Enumerated(value = EnumType.STRING)
    private Orderstatus orderstatus;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Client client;

    public Order(OrderDTO orderDTO){
        this.client.setId(orderDTO.cliente_id());
        this.description = orderDTO.description();
    }

    public Order(OrderProfessionalDTO orderProfessionalDTO){
        this.professional.setId(orderProfessionalDTO.professional_Id());
        this.price = orderProfessionalDTO.price();
        this.description_professional =  orderProfessionalDTO.description_Professional();
        this.orderstatus = orderProfessionalDTO.orderStatus();
    }


}
