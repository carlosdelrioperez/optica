import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.section}>
                    <h3 style={styles.heading}>Horarios</h3>
                    <p>De lunes a viernes de 10:00h a 13:30h y de 17:00h a 20:30h.</p>
                    <p>Sábados de 10.00 a 13.30h.</p>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.heading}>Contacto</h3>
                    <p>Plaza del Cabildo, local 3</p>
                    <p>41500 Alcalá de Guadaíra (Sevilla)</p>
                    <p>955683282</p>
                    <p>centroopticocabildo@hotmail.com</p>
                    <p>
                        <a href="https://maps.app.goo.gl/iHvqAnSfpYWhDLNB8" style={styles.mapLink}>
                            Localizar en el mapa
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.mapIcon} />
                        </a>
                    </p>
                </div>
            </div>
            <div style={styles.bottomBar}>
                <p style={styles.copy}>&copy; 2024 Centro Óptico. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: "rgba(33, 37, 41, 1)",
        color: '#fff',
        padding: '40px 0',
        textAlign: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: '20px',
    },
    section: {
        flex: '1',
        margin: '0 20px',
    },
    heading: {
        fontSize: '20px',
        marginBottom: '10px',
    },
    mapLink: {
        color: '#fff',
        marginLeft: '5px',
        textDecoration: 'none',
    },
    mapIcon: {
        fontSize: '18px',
    },
    bottomBar: {
        borderTop: '1px solid #666',
        paddingTop: '20px',
    },
    copy: {
        fontSize: '14px',
    },
};
