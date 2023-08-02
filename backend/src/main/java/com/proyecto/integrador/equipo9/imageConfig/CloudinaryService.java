package com.proyecto.integrador.equipo9.imageConfig;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile imageFile) throws IOException {
        Map<String, Object> params = ObjectUtils.asMap(
                "use_filename", true,
                "unique_filename", false,
                "overwrite", true
        );
        // Subimos la imagen a Cloudinary y obtenemos la URL de la imagen subida
        Map<?, ?> result = cloudinary.uploader().upload(imageFile.getBytes(), params);
        return result.get("secure_url").toString();
    }
}
