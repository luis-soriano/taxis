public class Client {
    private Long id;
    private String nombre;
    private double latitud;
    private double longitud;
}

public class Driver {
    private Long id;
    private String nombre;
    private String apellido;
    private double latitud;
    private double longitud;
}

public class Ride {
    private Long id;
    private Client cliente;
    private Driver conductor;
    private String destino;
    private String estado; // solicitado, en curso, finalizado
}

@Service
public class RideService {
    public Ride solicitarServicio(Client cliente) {
        // lógica para asignar conductor más cercano
    }

    public void notificarConductor(Driver conductor, Ride ride) {
        // enviar notificación
    }
}
