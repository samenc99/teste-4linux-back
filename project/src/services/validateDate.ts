export default function (data : any):boolean{
  const d = new Date(data)
  return !isNaN(d.getFullYear());
}