import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
} from '@mui/material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

const App = () => {
  const [data, setData] = useState([
    { id: 1, name: '01' },
    { id: 2, name: '02' },
    {
      id: 3,
      name: '03',
      user: { name: 'Lucas', dd: 88, phone: 998503947 },
    },
    { id: 4, name: '04' },
    { id: 5, name: '05' },
  ])
  const [loteData, setLoteData] = useState<{
    id: number
    name: string
  }>()
  const [userData, setUserData] = useState<{
    name: string
    dd: number
    phone: number
  }>()

  const handleClose = () => {
    setLoteData(undefined)
    setUserData(undefined)
  }

  return (
    <>
      <div className="p-2">
        {data.map((el) => {
          if (el.user)
            return (
              <Tooltip key={el.id} title={el.user.name} placement="right">
                <div
                  className="w-20 h-12 border-2 text-center border-black cursor-pointer bg-red-800 text-white"
                  onClick={() => {
                    setLoteData(el)
                    setUserData(el.user)
                  }}
                >
                  {el.name}
                </div>
              </Tooltip>
            )
          return (
            <Tooltip key={el.id} title="Livre" placement="right">
              <div
                className="w-20 h-12 border-2 text-center border-black cursor-pointer"
                onClick={() => {
                  setLoteData(el)
                }}
              >
                {el.name}
              </div>
            </Tooltip>
          )
        })}
      </div>
      {loteData && (
        <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Lote {loteData.name}
          </DialogTitle>
          <DialogContent>
            {userData ? (
              <div>
                <p>{userData.name}</p>
                <p>
                  ({userData.dd}) {userData.phone}
                </p>
              </div>
            ) : (
              <FormContainer
                onSuccess={(data) => {
                  setData((old) =>
                    old.map((el) => {
                      if (el.id === loteData.id) {
                        el.user = { ...data }
                      }
                      return el
                    }),
                  )
                  handleClose()
                }}
              >
                <div className="flex flex-col gap-3 p-2">
                  <TextFieldElement label="Proprietário" name="name" required />
                  <div className="flex gap-1">
                    <div className="basis-1/4">
                      <TextFieldElement
                        label="DD"
                        name="dd"
                        required
                        type="number"
                      />
                    </div>
                    <TextFieldElement
                      label="Número"
                      name="phone"
                      required
                      type="number"
                      fullWidth
                    />
                  </div>
                  <Button variant="contained" type="submit" fullWidth>
                    Salvar
                  </Button>
                </div>
              </FormContainer>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default App
