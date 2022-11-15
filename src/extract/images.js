function allImages(resource) {
  const roles = resource?.media?.map((media) => media.meta.role)

  const uniqueRoles = [...new Set(roles)]

  const allImages = {}

  uniqueRoles.map((role) => {
    allImages[role] = images(resource, role)
  })

  return allImages
}

function images(resource, role, crop) {
  const byRoles = imagesByRole(resource, role)

  let images = []

  if (crop) {
    ibyRoles.map((imageByRole) => {
      images.push(imageByRole[crop])
    })
  } else {
    images = byRoles
  }

  return images
}

function imagesByRole(resource, role) {
  if (!resource.media) {
    return []
  }

  const mediaArray = resource.media

  const imagesByUUID = {}

  Object.values(mediaArray)
    .filter((media) => {
      return media.meta.role === role
    })
    .map((media) => {
      if (!imagesByUUID[media.meta.uuid]) {
        imagesByUUID[media.meta.uuid] = {}
      }

      imagesByUUID[media.meta.uuid][media.meta.crop] = media
    })

  return Object.values(imagesByUUID)
}

export { allImages, images, imagesByRole }
