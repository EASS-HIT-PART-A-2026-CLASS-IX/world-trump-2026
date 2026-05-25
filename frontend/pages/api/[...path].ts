import type { NextApiRequest, NextApiResponse } from 'next'

const BACKEND = process.env.BACKEND_URL || 'http://backend:8000'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query
  const pathStr = Array.isArray(path) ? path.join('/') : path || ''

  const url = `${BACKEND}/${pathStr}`
  const headers: Record<string, string> = {}
  if (req.headers['content-type']) {
    headers['Content-Type'] = req.headers['content-type'] as string
  }

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      fetchOptions.body = JSON.stringify(req.body)
    }

    const backendRes = await fetch(url, fetchOptions)
    const data = await backendRes.json()

    res.status(backendRes.status).json(data)
  } catch (err) {
    res.status(502).json({ error: 'Backend unreachable', detail: String(err) })
  }
}
