function images(resource) {
  const roles = resource?.media?.map((media) => media.meta.role)
  const uniqueRoles = [...new Set(roles)]
  const images = {}

  uniqueRoles.map((role) => {
    images[role] = media(resource, role)
  })

  return images
}

function media(resource, role, crop) {
  const media = mediaByRole(resource, role)
  let images = []

  if (crop) {
    media.map((imageByRole) => {
      images.push(imageByRole[crop])
    })
  } else {
    images = media
  }

  return images
}

function mediaByRole(resource, role) {
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

export { images, media, mediaByRole }
